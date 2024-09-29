import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

import { CreateMember } from '@/app/(private)/member/add/components/create-form/create-form';
import { HousingConditionValues } from '@/app/(private)/member/add/components/create-form/schemas/member.schema';
import { db } from '@/lib/firebase/config';

export interface Member extends CreateMember {
  id: string;
  userId: string;
}

interface IMemberController {
  collectionPath: string;
  create(data: Omit<Member, 'id'>): Promise<Member>;
  list(userId: string): Promise<Member[]>;
  find(
    props: Partial<Pick<CreateMember, 'cpf'>>,
    userId: string
  ): Promise<Member[]>;
}

export const MemberController: IMemberController = {
  collectionPath: 'member',
  async create(data: Omit<Member, 'id'>): Promise<Member> {
    let document: Omit<Member, 'id'> = {
      name: data.name,
      cpf: data.cpf,
      birthDate: data.birthDate,
      baptismDate: data.baptismDate,
      maritalStatus: data.maritalStatus,
      occupation: data.occupation,
      commonChurch: data.commonChurch,
      housingCondition: data.housingCondition,
      userId: data.userId,
    };

    if (
      data.housingCondition === HousingConditionValues.rent ||
      data.housingCondition === HousingConditionValues.financed
    ) {
      document = { ...document, housingValue: data.housingValue };
    }

    const response = await addDoc(
      collection(db, this.collectionPath),
      document
    );

    return { id: response.id, ...data };
  },
  async list(userId: string): Promise<Member[]> {
    const q = query(
      collection(db, this.collectionPath),
      where('userId', '==', userId)
    );

    const members: Member[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      members.push({
        id: doc.id,
        ...(doc.data() as Omit<Member, 'id'>),
      });
    });

    return members;
  },
  async find(props, userId: string): Promise<Member[]> {
    const constraints = [where('userId', '==', userId)];

    if (props.cpf) constraints.push(where('cpf', '==', props.cpf));

    const q = query(collection(db, this.collectionPath), ...constraints);

    const members: Member[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      members.push({ id: doc.id, ...(doc.data() as Omit<Member, 'id'>) });
    });

    return members;
  },
};
