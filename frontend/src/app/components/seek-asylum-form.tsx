import React from 'react'

import { useForm, UseFormRegister } from 'react-hook-form'

type SeekAsylumFormData = {
  skills: string
  age: number
  country: string
  status: 'verified' | 'not_verified'
  id_type: 'NIN' | 'SSN' | 'Passport_ID' | 'Others'
  gov_id_number: string
  resumeUrl: string
  category: 'refugee' | 'employer' | 'government'
}

interface SeekAsylumFormProps {
  register: UseFormRegister<SeekAsylumFormData>
}

const SeekAsylumForm: React.FC<SeekAsylumFormProps> = ({ register }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SeekAsylumFormData>()

  const onSubmit = (data: SeekAsylumFormData) => {
    console.log(data) // You can handle form submission here
  }

  return <></>
}

export default SeekAsylumForm
