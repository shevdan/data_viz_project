import type {
  AgeGroup,
  BudgetType,
  EducationLevel,
  Gender,
} from '~/entities/student';

export type FilterConfig = {
  gender: Gender | 'all';
  budget: BudgetType | 'all';
  degree: EducationLevel | 'all';
  age: AgeGroup | 'all';
};

export type FilterType = keyof FilterConfig;
