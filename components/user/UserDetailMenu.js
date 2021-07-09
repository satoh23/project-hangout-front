import MaleMenu from "./MaleMenu";
import FemaleMenu from "./FemaleMenu";

export default function UserDetailMenu ({ genderId, id, userName, isShowInvite, setIsShowInvite }) {
    return (
        <div className="border-t-2 border-pink-200 border-dashed pt-2 mb-2">
            {genderId===`${process.env.NEXT_PUBLIC_MALE_ID}` ?
                <span>
                    <MaleMenu />
                </span>
                :
                <span>
                    <FemaleMenu id={id} userName={userName} isShowInvite={isShowInvite} setIsShowInvite={setIsShowInvite} />
                </span>
            }
    </div>
    )
}
