import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    if (!Array.isArray(courseSectionData) || courseSectionData.length === 0) return
    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`)
    } else {
      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId
      )

      const subSections = filteredData?.[0]?.subSections

      if (!Array.isArray(subSections) || subSections.length === 0) {
        return;
      }

      const filteredVideoData = subSections.filter(
        (data) => data?._id === subSectionId
      )

      if (filteredVideoData?.length > 0) {
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      } else {
        navigate(`/dashboard/enrolled-courses`)
      }
    }
  }

  useEffect(() => {
    getData();
  }, [courseSectionData, courseEntireData, location.pathname])


  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSections.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  const goToNextVideo = () => {

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSections.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSections.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSections[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSections[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSections.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSections.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSections.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSections[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSections.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSections[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res.success) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }


  return (
    <div className="flex flex-col gap-5 text-white">
      <div className="w-full">
        {!videoData ? (
          <img
            src={previewSource}
            alt="Preview"
            className="h-auto w-full rounded-md object-cover"
          />
        ) : (
          <div className="relative w-full overflow-hidden rounded-md bg-primary-700">
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.video?.url}
            >
              <BigPlayButton position="center" />
            </Player>

            {videoEnded && (
              <div className="absolute inset-0 z-[100] grid h-full place-content-center bg-gradient-to-t from-black/95 via-black/70 to-transparent px-4">
                <div className="mx-auto w-full max-w-xl text-center">
                  {!completedLectures.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onclick={() => handleLectureCompletion()}
                      text={!loading ? "Mark As Completed" : "Loading..."}
                      customClasses="text-lg w-full max-w-max px-4 mx-auto"
                    />
                  )}
                  <IconBtn
                    disabled={loading}
                    onclick={() => {
                      if (playerRef?.current) {
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    text="Rewatch"
                    customClasses="mt-3 text-lg w-full max-w-max px-4 mx-auto"
                  />
                  <div className="mt-8 flex w-full items-center justify-center gap-4 text-lg">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="rounded-md bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-600 disabled:opacity-50"
                      >
                        Prev
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="rounded-md bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-600 disabled:opacity-50"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <h1 className="mt-4 text-2xl font-semibold text-white">{videoData?.title}</h1>
      <p className="pt-2 pb-6 text-gray-300">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails;