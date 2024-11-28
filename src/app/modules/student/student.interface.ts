export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherContact: string;
  motherName: string;
  motherContact: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: Guardian;
  profileImage?: string;
  isActive: "active" | "blocked";
};
