import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

import { CreateRecordSheet } from '@/app/(private)/(home)/components/create-form/create-form';
import { db } from '@/lib/firebase/config';

import { toast } from 'sonner';

export interface DataSheet extends CreateRecordSheet {
  id: string;
  userId: string;
}

interface IDataSheetController {
  collectionPath: string;
  create(data: Omit<DataSheet, 'id'>): Promise<void>;
  list(userId: string): Promise<DataSheet[]>;
}

export const DataSheetController: IDataSheetController = {
  collectionPath: 'data-sheet',
  async create(data: Omit<DataSheet, 'id'>): Promise<void> {
    await addDoc(collection(db, this.collectionPath), {
      name: data.name,
      cpf: data.cpf,
      birthDate: data.birthDate,
      baptismDate: data.baptismDate,
      maritalStatus: data.maritalStatus,
      occupation: data.occupation,

      userId: data.userId,
    });

    toast.success(`Registro adicionado com sucesso`);
  },
  async list(userId: string): Promise<DataSheet[]> {
    const q = query(
      collection(db, this.collectionPath),
      where('userId', '==', userId)
    );

    const dataSheets: DataSheet[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      dataSheets.push({
        id: doc.id,
        ...(doc.data() as Omit<DataSheet, 'id'>),
      });
    });

    return dataSheets;
  },
};
