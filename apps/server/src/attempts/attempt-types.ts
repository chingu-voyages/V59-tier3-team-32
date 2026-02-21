export type Attempt = {
  id: string;
  userId: string;
  quizId: string;
  role: string;
  questionsCount: number;
  correctCount: number;
  createdAt: Date;
};
