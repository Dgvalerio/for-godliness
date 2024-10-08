import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

import { CreateChurch } from '@/app/(private)/church/add/components/create-form/create-form';
import { db } from '@/lib/firebase/config';

export interface Church extends CreateChurch {
  id: string;
  userId: string;
}

interface IChurchController {
  collectionPath: string;
  create(data: Omit<Church, 'id'>): Promise<void>;
  list(userId: string): Promise<Church[]>;
  find(
    props: Partial<Pick<CreateChurch, 'number' | 'name'>>,
    userId: string
  ): Promise<Church[]>;
}

export const ChurchController: IChurchController = {
  collectionPath: 'church',
  async create(data: Omit<Church, 'id'>): Promise<void> {
    await addDoc(collection(db, this.collectionPath), {
      name: data.name,
      number: data.number,
      userId: data.userId,
    });
  },
  async list(userId: string): Promise<Church[]> {
    const q = query(
      collection(db, this.collectionPath),
      where('userId', '==', userId)
    );

    const churches: Church[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      churches.push({
        id: doc.id,
        ...(doc.data() as Omit<Church, 'id'>),
      });
    });

    return churches;
  },
  async find(props, userId: string): Promise<Church[]> {
    const constraints = [where('userId', '==', userId)];

    if (props.number) constraints.push(where('number', '==', props.number));

    const q = query(collection(db, this.collectionPath), ...constraints);

    const churches: Church[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      churches.push({
        id: doc.id,
        ...(doc.data() as Omit<Church, 'id'>),
      });
    });

    return churches;
  },
};
