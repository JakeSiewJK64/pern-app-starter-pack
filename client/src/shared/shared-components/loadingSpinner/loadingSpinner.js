import { Flex } from "@react-css/flex";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingSpinner = () => {
  return (
    <div className="m-auto w-50">
      <Flex column alignItemsCenter>
        <h4>loading...</h4>
        <CircularProgress disableShrink size={25} />;
      </Flex>
    </div>
  );
};

export default LoadingSpinner;
