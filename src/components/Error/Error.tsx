import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectErrorMessage, clearError } from '../../redux/slices/errorSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/hooks';

function Error() {
  const errorMeassge = useAppSelector(selectErrorMessage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Boolean(errorMeassge)) {
      toast.info(errorMeassge);
      dispatch(clearError());
    }
  }, [errorMeassge, dispatch]);
  return <ToastContainer position="top-right" autoClose={2000} />;
}

export default Error;
