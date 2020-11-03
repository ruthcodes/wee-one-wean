import React from "react";
import Link from "next/link";

type Props = {

}

const Navigation: React.FC<Props> = () => {
  return (
    <nav className="Navigation">
      <div className="NavLink">
        <Link href="/">Home</Link>
      </div>

      <div className="NavLink">
        <Link href="/add">Input Meal</Link>
      </div>

      <div className="NavLink">
        <Link href="/stats">Stats</Link>
      </div>
    </nav>
  )
}

export default Navigation