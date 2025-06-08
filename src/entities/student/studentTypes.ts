export type StudentRecord = {
  region: string;
  examScore: string;
  ageAtEnrollment: string;
  educationLevel: string;
  fundingType: string;
  isMale: string;
  isBudget: string;
  isOlder24: string;
};

export type StatisticFilterType = 'score' | 'age' | 'count';

export type EducationLevel =
  | 'Бакалавр'
  | 'Магістр'
  | 'Фаховий молодший бакалавр';

export type Gender = 'male' | 'female';
export type BudgetType = 'budget' | 'contract';
export type AgeGroup = 'young' | 'old';
