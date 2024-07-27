import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

import { db } from '@/lib/firebase/config';

import { toast } from 'sonner';

export interface DataSheet {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  description: string;
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
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
      description: data.description,
      userId: data.userId,
    });

    toast.success(
      `Apontamento criado para o dia "${data.day} as ${data.startTime}:${data.endTime}"`
    );
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
