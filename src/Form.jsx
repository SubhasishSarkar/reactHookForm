import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useConfirm } from "react-confirm-window";
export default function App() {
    const confirm = useConfirm();
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, dirtyFields, isValid },
        watch,
        setValue,
        getValues,
    } = useForm({ defaultValues: { first_name: "", last_name: "", email: "", mobile_number: "", title: "", developer: "", team: "" } });
    const watchAll = watch();
    const wathIsDev = watch("developer");
    const onSubmit = async (data) => {
        const choice = await confirm({
            header: "Please Confirm",
            title: "Are you sure you want to submit",
            closeButtonLable: "Cancel",
            confirmButtonLable: "Submit",
        });

        if (choice) {
            console.log(data);
        }
    };
    //   console.log(errors);

    useEffect(() => {
        if (watchAll.dob && !getValues("age")) {
            console.log("WATCH : ", watchAll.dob);
            setValue("age", 10);
        }
    }, [watchAll]);
    useEffect(() => {
        console.log("ERROR   : ", errors, isDirty, dirtyFields, isValid);
    }, [errors, isDirty, dirtyFields, isValid]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input type="text" placeholder="First name" {...register("first_name", { required: "First name is required", maxLength: 80 })} />
            <span>{errors?.first_name?.message}</span>
            <br />
            <br />
            <input type="text" placeholder="Last name" {...register("last_name", { required: "Last name is required", maxLength: 100 })} />
            <span>{errors?.last_name?.message}</span>
            <br />
            <br />
            <input
                type="text"
                placeholder="Email"
                {...register("email", {
                    required: { value: true, message: "Email number is required" },
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
            />
            <span>{errors?.email?.message}</span>
            <br />
            <br />
            <input
                type="tel"
                placeholder="Mobile number"
                {...register("mobile_number", {
                    required: { value: true, message: "Phone number is required" },
                    minLength: {
                        value: 10,
                        message: "Invalid",
                    },
                    validate: {
                        blackList: (value) => {
                            return value != "1234567890" || "Black listed";
                        },
                    },
                })}
            />
            <span>{errors?.mobile_number?.message}</span>
            <br />
            <br />
            <select {...register("title", { required: { value: true, message: "Title is required" } })}>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
            </select>
            <span>{errors?.title?.message}</span>
            <br />
            <br />
            <input {...register("developer", { required: { value: true, message: "required" } })} type="radio" value="Yes" />
            <input {...register("developer", { required: { value: true, message: "required" } })} type="radio" value="No" />
            <span>{errors?.developer?.message}</span>
            <br />
            <br />
            {wathIsDev === "Yes" && (
                <>
                    <input
                        type="text"
                        placeholder="Team"
                        {...register("team", {
                            ...(watchAll.title == "Mr" ? { required: { value: true, message: "Team is required" } } : { required: false }),
                        })}
                    />
                    <span>{errors?.team?.message}</span>
                    <br />
                    <br />
                </>
            )}

            <input type="date" placeholder="DOB" {...register("dob", { required: { value: true, message: "DOB required" } })} />
            <span>{errors?.dob?.message}</span>
            <br />
            <br />
            <input type="age" placeholder="Age" {...register("age", { required: { value: true, message: "Age required" } })} disabled />
            <span>{errors?.age?.message}</span>
            <br />
            <br />
            <input type="submit" />
        </form>
    );
}
