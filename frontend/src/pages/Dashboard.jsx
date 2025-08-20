import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const authToken = localStorage.getItem("token");
  const [questions, setQustions] = useState("");
  console.log("questions", questions);

  async function getQuestion() {
    try {
      const res = await fetch("http://localhost:5000/api/exam/start", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });

      setQustions(res);
    } catch (err) {
      console.log("error", err);
    }
  }

//   async function addQuestion() {
//     console.log("added");
//   }

  function submit() {
    console.log("submited");
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className="min-h-screen flex p-6 justify-center">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
        {/* <p>{questions}</p> */}

        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Border Magic
          </span>
        </button>

        <button
          type="button"
          onClick={submit}
          class="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
