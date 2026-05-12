import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { MdNavigateNext } from 'react-icons/md';
import toast from 'react-hot-toast';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { updateSection, addSectionDetails } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';


function CourseBuilderForm() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [ loading, setLoading ] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSections.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return ;
    }

    dispatch(setStep(3));

  }

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName){
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      }, token)
    }

    else {
      result = await addSectionDetails({
        sectionName: data.sectionName,
        courseId: course._id
      }, token);
    }

    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false); 
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {

    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <>
      <div className="space-y-8 rounded-xl border border-gray-700 bg-primary-700 p-6 shadow-sm shadow-black/20">
        <p className="text-2xl font-semibold text-white">Course Builder</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-white" htmlFor="sectionName">
              Section name <sup className="text-coral-500">*</sup>
            </label>
            <input
              id='sectionName'
              disabled={loading}
              placeholder="Add a section to build your course"
              className="form-style w-full"
              {...register("sectionName", { required: true })}
            />
            {
              errors.sectionName && (
                <span className="ml-2 text-xs tracking-wide text-coral-500">
                  Section name is required
                </span>
              )
            }
          </div>
          <div className="flex items-end gap-x-4">
            <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            disabled={loading}
            customClasses="flex items-center text-white gap-2 "
            outline={true}
            >
              <IoAddCircleOutline size={20} className="text-secondary-500"/>
            </IconBtn>
            {
              editSectionName && (
                <button
                type="button"
                className="text-sm text-gray-300 underline transition hover:text-white"
                onClick={cancelEdit}
                >
                  Cancel Edit
                </button>
              )
            }
          </div>

        </form>

        {
          course?.courseContent?.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
          )
        }

        <div className="flex justify-end gap-x-3">
          <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-primary-600 py-[8px] px-[20px] font-semibold text-gray-200 transition hover:bg-primary-500 hover:text-white`}
          >
            Back
          </button>
          <IconBtn
          disabled={loading}
          customClasses="bg-secondary-500 px-4 py-2 rounded-md text-white font-semibold flex gap-2 items-center"
          text={"Next"}
          onclick={goToNext}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </div>
    </>
  )
}

export default CourseBuilderForm;