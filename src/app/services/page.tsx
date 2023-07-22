import { serviceApi } from "@/api-client";
import { Service } from "@/models/service.type";


const Services = async () => {
  const {data} = await serviceApi.getAll()
  return (
    <>
      <div className="list__service">
        {data?.map((service: Service) => {
          return <li key={service.id}>{service.name}</li>
        })}
      </div>
    </>
  );
};
export default Services;
