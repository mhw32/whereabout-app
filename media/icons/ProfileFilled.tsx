import Svg, { Path, Circle } from "react-native-svg"

const ProfileFilled = () => (
  <Svg width={24} height={24} fill={"white"} stroke={"white"}>
    <Circle cx={12} cy={6} r={5} fill="white" />
    <Path
      fill="white"
      fillRule="evenodd"
      d="M22 23c0-5.523-4.477-10-10-10S2 17.477 2 23h20Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ProfileFilled;