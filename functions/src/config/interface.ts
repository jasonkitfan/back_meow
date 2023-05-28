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

export type AdoptionRecord = {
  catBreed: string;
  catDob: string;
  catGender: string;
  catId: string;
  catImageUrl: string;
  catName: string;
  catPickUpDate: string;
  createAt: number;
  pickUpOwner: string;
};
