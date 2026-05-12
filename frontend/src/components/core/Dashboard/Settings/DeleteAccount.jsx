import { FiTrash2 } from "react-icons/fi"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-xl border border-coral-700 bg-coral-900 p-8 px-12 shadow-sm shadow-black/20">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-coral-700">
          <FiTrash2 className="text-3xl text-coral-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">
            Delete Account
          </h2>
          <div className="w-3/5 text-gray-300">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-coral-500 transition hover:text-coral-400"
            onClick={() =>
              setConfirmationModal({
                text1: "Delete account?",
                text2:
                  "Your account and all associated data will be permanently deleted.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  handleDeleteAccount()
                  setConfirmationModal(null)
                },
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modaldata={confirmationModal} />}
    </>
  )
}