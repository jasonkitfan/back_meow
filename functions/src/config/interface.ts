export type EntryType = {
  name: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  imageUrl: string;
};

export type Request = {
  body: EntryType;
  params: {
    entryId: string;
  };
};
