/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function UserProfile({ params }: any) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />

      <p className="text-3xl">
        Welcome to your profile page!
        <span className="p-2 rounded bg-orange-400 text-black m-2">
          {resolvedParams.id}
        </span>
      </p>
    </div>
  );
}
