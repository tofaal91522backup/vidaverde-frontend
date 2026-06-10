import ResetPasswordForm from "./reset-password.form";

const ResetPasswordPage = ({ uid, token }: { uid: string; token: string }) => {
  return <ResetPasswordForm uid={uid} token={token} />;
};

export default ResetPasswordPage;
