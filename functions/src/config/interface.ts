export type EntryType = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  imageUrl: string;
  pickUpdate?: string;
};

export type Request = {
  body: EntryType;
  params: {
    entryId: string;
  };
};
