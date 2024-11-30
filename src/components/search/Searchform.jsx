import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";

export const Searchform = ({ onSearch }) => {
  const { register } = useForm();

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm);
    }, 1000), // Debounce for 300 milliseconds
    [onSearch]
  );

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    handleSearch(searchTerm);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        {...register("search", {
          onChange: (e) => handleChange(e),
        })}
        className="p-3 m-2 ml-auto rounded-lg bg-white text-three outline-none hidden bg-transparent sm:block sm:w-16 md:w-40"
      />
    </form>
  );
};
