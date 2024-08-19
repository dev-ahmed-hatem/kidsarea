import axios from "./axiosconfig";
import endpoints from "./config";

export const fetchUserData = async () => {
    try {
        const response = await axios.get(endpoints.authenticated_user);
        return response.data;
    } catch (error) {
        return {};
    }
};

export const defaultFormSubmission = ({
    url,
    data,
    headers = {},
    formFunction,
    setPost,
    showToast,
    message,
    reset,
    callBack,
    setError,
}) => {
    const requestMethod = formFunction == "add" ? axios.post : axios.patch;
    setPost(true);
    requestMethod(url, data, { headers: headers })
        .then((response) => {
            showToast(message[formFunction]);
            reset();
            if (callBack) callBack();
        })
        .catch((error) => {
            console.log(error);
            if (error.response?.status == 400 && error.response?.data) {
                const serverErrors = error.response.data;
                for (let field in serverErrors) {
                    const message =
                        serverErrors[field][0].search("exists") == -1
                            ? "قيمة غير صالحة"
                            : "القيمة موجودة سابقا";
                    setError(field, {
                        type: "server",
                        message: message,
                    });
                }
            } else {
                showToast("خطأ فى تنفيذ العملية", true);
            }
        })
        .finally(() => {
            setPost(false);
        });
};

// fetch specific model permissions from api
export const get_models_permissions = async (models) => {
    try {
        const response = await axios.post(endpoints.models_permissions, {
            models: models,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

// set permission for specific view
export const set_page_permissions = ({
    permissions_list,
    setPermissions,
    setLoading,
    setLoadError,
    setForbidden,
}) => {
    get_models_permissions(permissions_list)
        .then((data) => {
            setPermissions(data);
            // make forbidden if all model permissions are empty
            for (let i in data) {
                if (data[i].length !== 0) {
                    setForbidden(false);
                    return;
                }
            }
            setForbidden(true);
        })
        .catch((error) => {
            setLoadError(error);
        })
        .finally(() => {
            setLoading(false);
        });
};

// fetch current entries of model
export const fetch_list_data = ({
    searchURL,
    setData,
    setFetchError,
    setLoading,
}) => {
    axios
        .get(searchURL)
        .then((response) => {
            setData(response.data);
        })
        .catch((fetchError) => {
            setFetchError(fetchError);
        })
        .finally(() => {
            setLoading(false);
        });
};
