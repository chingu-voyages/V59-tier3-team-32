export type Attempt = {
  userId: string;
  quizId: string;
  createdAt: Date;
  role: string;
  questionsCount: number;
  correctCount: number;
};
