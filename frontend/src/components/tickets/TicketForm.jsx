import React, { useState, useEffect } from "react";
import FormGroup from "../groups/FormGroup";
import { Label, Select, Datepicker, TextInput } from "flowbite-react";
import Loading from "../groups/Loading";
import { useForm, Controller } from "react-hook-form";
import endpoints from "../../config/config";
import { FcInvite } from "react-icons/fc";
import { defaultFormSubmission, fetch_list_data } from "../../config/actions";
import { useToast } from "../../providers/ToastProvider";

const TicketForm = ({ postURL, defaultValues, callBack }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [post, setPost] = useState(false);
    const { showToast } = useToast();
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        setError,
        control,
        reset,
    } = useForm({
        defaultValues: {
            ...defaultValues,
            game: defaultValues?.game?.id,
        },
    });
    const formFunction = defaultValues ? "edit" : "add";
    const [games, setGames] = useState(null);

    const get_current_games = () => {
        fetch_list_data({
            searchURL: `${endpoints.game_list}no_pagination=true`,
            setData: setGames,
            setFetchError: setFetchError,
            setLoading: setIsLoading,
        });
    };

    useEffect(() => {
        get_current_games();
    }, []);

    const onSubmit = (data) => {
        data = {
            ...data,
            category: Number(data.category),
            amount: Number(data.amount),
            date: data.date
                ? data.date
                : new Date().toLocaleDateString("en-CA"),
        };

        defaultFormSubmission({
            url: postURL,
            data: data,
            formFunction: formFunction,
            setPost: setPost,
            showToast: showToast,
            message: { add: "تم إضافة التذكرة", edit: "تم تعديل التذكرة" },
            reset: reset,
            callBack: callBack,
            setError: setError,
        });
    };
    return (
        <FormGroup
            onSubmit={handleSubmit(onSubmit)}
            title={formFunction == "add" ? "إضافة تذكرة" : "تعديل تذكرة"}
            formFunction={formFunction}
            post={post}
        >
            {isLoading ? (
                <Loading className={`w-full text-center`} />
            ) : fetchError ? (
                <p className="text-lg text-center text-red-600 py-4 w-full m-auto">
                    خطأ في تحميل البيانات
                </p>
            ) : (
                <>
                    <div className="w-full lg:max-w-md lg:w-[30%]">
                        <div className="mb-2 block">
                            <Label htmlFor="game" value="اللعبة :" />
                        </div>
                        <Select
                            id="game"
                            type="select"
                            color={errors.game ? "failure" : "primary"}
                            {...register("game", {
                                required: "هذا الحقل مطلوب",
                            })}
                            onBlur={() => trigger("game")}
                        >
                            {games.map((game) => (
                                <option value={game.id} key={game.id}>
                                    {game?.name}
                                </option>
                            ))}
                        </Select>
                        {errors.game && (
                            <p className="error-message">
                                {errors.game.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full lg:max-w-md lg:w-[30%]">
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="التاريخ  :" />
                        </div>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <Datepicker
                                    selected={field.value}
                                    id="date"
                                    language="ar"
                                    labelClearButton="مسح"
                                    labelTodayButton="اليوم"
                                    placeholder="تاريخ الميلاد"
                                    color={"primary"}
                                    onSelectedDateChanged={(date) => {
                                        field.onChange(
                                            date.toLocaleDateString("en-CA")
                                        );
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="w-full lg:max-w-md lg:w-[30%]">
                        <div className="mb-2 block">
                            <Label htmlFor="amount" value="العدد :" />
                        </div>
                        <TextInput
                            id="amount"
                            type="number"
                            rightIcon={FcInvite}
                            placeholder="العدد"
                            color={errors.amount ? "failure" : "primary"}
                            defaultValue={1}
                            {...register("amount", {
                                required: "هذا الحقل مطلوب",
                            })}
                            onBlur={() => trigger("amount")}
                        />
                        {errors.amount && (
                            <p className="error-message">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>
                </>
            )}
        </FormGroup>
    );
};

export default TicketForm;
