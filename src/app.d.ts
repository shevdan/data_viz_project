declare module '*.csv' {
  interface StudentRecord {
    region: string;
    examScore: string;
    ageAtEnrollment: string;
    educationLevel: string;
    fundingType: string;
    isMale: string;
    isBudget: string;
    isOlder24: string;
  }

  const content: StudentRecord[];
  export default content;
}
