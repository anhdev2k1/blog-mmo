"use client";
import "./service.scss";
import { serviceApi } from "@/api-client";
import { useEffect, useState } from "react";
import { Service } from "@/models/service.type";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchServices = async () => {
        const getServices = await serviceApi.getAll();
        setServices(getServices.data!);
      };
      fetchServices();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const searchService = (searchInput: string) => {
    if (services?.length! > 0) {
      return services?.filter(
        (service) =>
          service.name.includes(searchInput.toLocaleLowerCase()) &&
          !service.deleteAt
      );
    }
    return services.filter((service) => !service.deleteAt);
  };

  return (
    <div className="wrapper">
      <div className="service__container">
        <h3 className="service__container-heading">Các Dịch vụ của chúng tôi:</h3>
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Tìm kiếm gì đó..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="search__btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className="service__main">
          {isLoading ? (
            <p style={{ color: "white" }}>Loading...</p>
          ) : searchService(searchValue).length > 0 ? (
            searchService(searchValue)!?.map((service: Service) => {
              return (
                <Link
                  href={`/services/${service._id}`}
                  className="service__item"
                >
                  <div className="service__item-circle"></div>
                  <div className="service__item-img">
                    <img src={service.image} alt="" />
                  </div>
                  <div className="service__item-title">
                    <h3 className="service__item-name">{service.name}</h3>
                    <p className="service__item-desc">{service.slug}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p style={{ color: "white" }}>Chưa có dịch vụ nào</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
