import { useNavigate } from "react-router-dom";

const Sidebar = ({ offerers, selectOfferer }: any): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div>
      <h4 className="text-center text-xl font-semibold">Workers available</h4>
      <div className="mt-5 flex max-h-full flex-col justify-start overflow-auto">
        {offerers.map((offerer: any, idx: number) => (
          <div
            key={offerer.id}
            className={`p-5 hover:cursor-pointer ${
              idx % 2 === 0 ? "" : "bg-white"
            }`}
            onClick={() => navigate(`/app/workers/${offerer.id}`)}
          >
            <h5 className="font-semibold">{offerer.user.first_name}</h5>
            <p>{offerer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
