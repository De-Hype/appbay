import { useDispatch, useSelector } from "react-redux";
import { toggleModal, toggleModalItem } from "../redux/actionSlice";
import { updateUser, User } from "../redux/userSlice";
import { updateItem, Item } from "../redux/itemSlice";
import { RootState } from "../redux/store";
import axios from "axios";
import { BaseURL } from "../utils";
import { useForm } from "react-hook-form";

type DetailsModalProps = {
  isType: "user" | "item";
  usedFor: "edit" | "create";
};

const DetailsModal = ({ isType, usedFor }: DetailsModalProps) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state: RootState) => state.users);
  const { selectedItem } = useSelector((state: RootState) => state.items);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User | Item>({
    defaultValues:
      isType === "user"
        ? selectedUser || {
            name: "",
            email: "",
            location: "",
            role: "",
          }
        : selectedItem || {
            name: "",
            description: "",
            price: 0,
          },
  });

  const onSubmit = async (data: User | Item) => {
    const type = isType === "user" ? "user" : "item";
    const action = usedFor === "create" ? "create" : "edit";
    const key = `${type}_${action}`;

    switch (key) {
      case "user_create": {
        const userData = data as User;
        try {
          const response = await axios.post(`${BaseURL}/users`, userData);
          if (response.statusText === "Created") {
            alert("User created successfully");
            dispatch(toggleModal(false));
            reset();
          }
        } catch (err) {
          alert("Failed to create a user");
          console.error("Error creating user:", err);
        }
        break;
      }

      case "user_edit": {
        const userData = data as User;
        try {
          const response = await axios.put(
            `${BaseURL}/users/${selectedUser?.id}`,
            userData
          );
          if (response.statusText === "OK") {
            alert("User updated successfully");
            dispatch(updateUser(response.data));
            dispatch(toggleModal(false));
            window.location.reload();
          }
        } catch (err) {
          alert("Failed to update User");
          console.error("Error updating user:", err);
        }
        break;
      }

      case "item_create": {
        const itemData = data as Item;
        try {
          const response = await axios.post(`${BaseURL}/items`, {
            name: itemData.name,
            description: itemData.description,
            price: Number(itemData.price),
          });
          if (response.statusText === "Created") {
            alert("Item created successfully");
            dispatch(toggleModalItem(false));
            window.location.reload();
            reset();
          }
        } catch (err) {
          alert("Failed to create an item");
          console.error("Error creating item:", err);
        }
        break;
      }

      case "item_edit": {
        const itemData = data as Item;
        try {
          const response = await axios.put(
            `${BaseURL}/items/${selectedItem?.id}`,
            {
              name: itemData.name,
              description: itemData.description,
              price: Number(itemData.price),
            }
          );
          if (response.statusText === "OK") {
            alert("Item updated successfully");
            dispatch(updateItem(response.data));
            dispatch(toggleModalItem(false));
          }
        } catch (err) {
          alert("Failed to update Item");
          console.error("Error updating item:", err);
        }
        break;
      }

      default: {
        console.error("Invalid type or action combination");
        break;
      }
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl text-center font-bold mb-4">
          {isType === "user"
            ? usedFor === "edit"
              ? "Edit User"
              : "Create User"
            : usedFor === "edit"
            ? "Edit Item"
            : "Create Item"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name must be less than 50 characters",
                },
              })}
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {isType === "user" ? (
            <>
              <div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full p-2 border rounded ${
                    errors?.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                    maxLength: {
                      value: 100,
                      message: "Location must be less than 100 characters",
                    },
                  })}
                  className={`w-full p-2 border rounded ${
                    errors.location ? "border-red-500" : ""
                  }`}
                  placeholder="Location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("role", {
                    required: "Role is required",
                    maxLength: {
                      value: 50,
                      message: "Role must be less than 50 characters",
                    },
                  })}
                  className={`w-full p-2 border rounded ${
                    errors.role ? "border-red-500" : ""
                  }`}
                  placeholder="Role"
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </>
          ) : (
            // Item-specific fields
            <>
              <div>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message: "Description must be less than 500 characters",
                    },
                  })}
                  className={`w-full p-2 border rounded ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  placeholder="Description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be greater than or equal to 0",
                    },
                  })}
                  className={`w-full p-2 border rounded ${
                    errors.price ? "border-red-500" : ""
                  }`}
                  placeholder="Price"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {usedFor === "edit" ? "Edit" : "Proceed"}
          </button>
          <button
            type="button"
            onClick={
              isType === "user"
                ? () => dispatch(toggleModal(false))
                : () => dispatch(toggleModalItem(false))
            }
            className="w-full bg-gray-400 text-white p-2 rounded mt-2 hover:bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsModal;
