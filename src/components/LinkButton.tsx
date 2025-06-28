import { CiCircleQuestion } from 'react-icons/ci'
const LinkButton = () => {
  return (
    <a
      href="https://github.com/NTU-KhPI-CMPS/tetrahedron-web/wiki"
      target="_blank"
      className="size-[26px] cursor-pointer"
    >
      <CiCircleQuestion className="size-full" />
    </a>
  )
}

export default LinkButton
