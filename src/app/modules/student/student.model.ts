import { Schema, model } from "mongoose";
import validator from "validator";
import {
  StudentModel,
  TGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required."],
    trim: true,
    maxlength: [40, "First Name cannot be more than 40 characters."],
    validate: {
      validator: function (value: string) {
        return value.charAt(0) === value.charAt(0).toUpperCase();
      },
      message: "{VALUE} is not in Capitalize format.",
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [40, "Middle Name cannot be more than 40 characters."],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required."],
    maxlength: [40, "Last Name cannot be more than 40 characters."],
    validate: {
      validator: (value: string) => validator.isAlpha(value, "en-US"),
      message: "{VALUE} contains invalid characters. Only letters are allowed.",
    },
  }
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required."],
  },
  fatherContact: {
    type: String,
    required: [true, "Father's Contact is required."],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, "any"),
      message: "{VALUE} is not a valid contact number.",
    },
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required."],
  },
  motherContact: {
    type: String,
    required: [true, "Mother's Contact is required."],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, "any"),
      message: "{VALUE} is not a valid contact number.",
    },
  },
});

const localGuardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Local Guardian's Father's Name is required."],
  },
  fatherContact: {
    type: String,
    required: [true, "Local Guardian's Father's Contact is required."],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, "any"),
      message: "{VALUE} is not a valid contact number.",
    },
  },
  motherName: {
    type: String,
    required: [true, "Local Guardian's Mother's Name is required."],
  },
  motherContact: {
    type: String,
    required: [true, "Local Guardian's Mother's Contact is required."],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, "any"),
      message: "{VALUE} is not a valid contact number.",
    },
  },
});

export const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "ID is required."],
    unique: true,
  },
  user : {
    type : Schema.Types.ObjectId,
    required : [true, 'User ID is required.'],
    unique: true,
    ref : 'User'
  },
  name: {
    type: UserNameSchema,
    required: [true, "Name is required."], 
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender.",
    },
    required: [true, "Gender is required."],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of Birth is required."],
    validate: {
      validator: (value: string) => validator.isDate(value),
      message: "{VALUE} is not a valid date.",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a valid email.",
    },
  },
  contactNo: {
    type: String,
    required: [true, "Contact Number is required."],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, "any"),
      message: "{VALUE} is not a valid contact number.",
    },
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
      message: "{VALUE} is not a valid blood group.",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address is required."],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address is required."],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required."],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian information is required."],
  },
  profileImage: {
    type: String,
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: "{VALUE} is not a valid URL.",
    },
  },
  admissionSemester : {
    type : Schema.Types.ObjectId,
    ref : 'AcademicSemester'
  },
  academicDepartment : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'AcademicDepartment'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  toJSON: {
    virtuals: true
  }
});

// virtual 

studentSchema.virtual("fullName").get(function(){
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})


// Query miidleware

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({ $match : {isDeleted: {$ne : true}}})
  next()
})

//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};


export const Student = model<TStudent, StudentModel>("Student", studentSchema);
