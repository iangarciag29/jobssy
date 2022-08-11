const StatsCard = ({
  value,
  text,
  className,
}: {
  value: number;
  text: string;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={`jobssy-bubble flex flex-row justify-between py-5 px-10 ${className}`}
    >
      <div className="grid items-center">
        <p className="text-4xl font-black">{value}</p>
      </div>
      <div className="grid items-center">
        <h4 className="text-xl font-semibold">{text}</h4>
      </div>
    </div>
  );
};

export default StatsCard;
