import BounceLoader from "react-spinners/BounceLoader";

export const Loading = () => {
  return (
    <div
      className={`h-heighWithOutNav overflow-auto absolute max-sm:flex max-sm:flex-col max-sm:items-center top-20 grid place-content-center w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0`}
    >
      <BounceLoader size={"8rem"} color="#13AFEF" />
    </div>
  );
};
