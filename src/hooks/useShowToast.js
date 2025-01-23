import { toaster } from "@/components/ui/toaster"
import { useCallback } from "react";

const useShowToast = () => {
	// useCallback is used to prevent infinite loop by caching the function
	const showToast = useCallback(
		(title, description, status) => {
			toaster.create({
				title: title,
				description: description,
				type: status,
				duration: 3000,
			});
		},
		[]
	);

	return showToast;
};

export default useShowToast;
