export type PostAttemptReq = {
  userId: string;
  quizId: string;
  role: string;
  questionsCount: number;
  correctCount: number;
};

export type Attempt = {
  id: string;
  userId: string;
  quizId: string;
  role: string;
  questionsCount: number;
  correctCount: number;
  createdAt: Date;
};
