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
        className="text-black outline-none"
      />
    </form>
  );
};
