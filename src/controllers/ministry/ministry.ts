import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

import { memberMinistrySchema } from '@/app/(private)/member/add/components/create-form/schemas/ministry.schema';
import { Member } from '@/controllers/member/member';
import { db } from '@/lib/firebase/config';

import { z } from 'zod';

export type CreateMinistry = Omit<
  z.infer<typeof memberMinistrySchema>,
  'hasMinistry'
> & { memberId: Member['id'] };

export interface Ministry extends CreateMinistry {
  id: string;
  userId: string;
}

interface IMinistryController {
  collectionPath: string;
  create(data: Omit<Ministry, 'id'>): Promise<void>;
  list(userId: string): Promise<Ministry[]>;
  find(
    props: Partial<Pick<CreateMinistry, 'memberId'>>,
    userId: string
  ): Promise<Ministry[]>;
}

export const MinistryController: IMinistryController = {
  collectionPath: 'ministry',
  async create(data: Omit<Ministry, 'id'>): Promise<void> {
    await addDoc(collection(db, this.collectionPath), {
      ministry: data.ministry,
      ministryPresentation: data.ministryPresentation,
      memberId: data.memberId,

      userId: data.userId,
    });
  },
  async list(userId: string): Promise<Ministry[]> {
    const q = query(
      collection(db, this.collectionPath),
      where('userId', '==', userId)
    );

    const ministries: Ministry[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      ministries.push({
        id: doc.id,
        ...(doc.data() as Omit<Ministry, 'id'>),
      });
    });

    return ministries;
  },
  async find(props, userId: string): Promise<Ministry[]> {
    const constraints = [where('userId', '==', userId)];

    if (props.memberId)
      constraints.push(where('memberId', '==', props.memberId));

    const q = query(collection(db, this.collectionPath), ...constraints);

    const ministries: Ministry[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      ministries.push({
        id: doc.id,
        ...(doc.data() as Omit<Ministry, 'id'>),
      });
    });

    return ministries;
  },
};
