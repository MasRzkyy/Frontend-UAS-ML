"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Diabetes Prediction System
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Sistem prediksi penyakit diabetes berdasarkan fitur medis seperti
            <span className="font-semibold"> Glucose</span>,
            <span className="font-semibold"> Blood Pressure</span>,
            <span className="font-semibold"> BMI</span>, dan lainnya. Gunakan
            salah satu metode di bawah ini untuk memulai prediksi.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: XGBOOST */}
          <motion.div
          >
            <Link
              href="/xgboost"
              className="block bg-white border border-gray-200 group-hover:w-full shadow-sm rounded-2xl p-8  transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                XGBoost
              </h2>
              <p className="text-gray-600">
                Model boosting berbasis pohon keputusan yang sangat efisien dan
                akurat, dirancang untuk memberikan prediksi diabetes dengan
                performa tinggi bahkan pada dataset kecil.
              </p>
              <div className="mt-6">
                <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:w-40">
                  <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
                    Mulai Prediksi
                  </div>
                  <div className="absolute right-3.5">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </Link>
          </motion.div>

          {/* Card: Random Forest */}
          <motion.div
          >
            <Link
              href="/rf"
              className="block bg-white border border-gray-200 shadow-sm rounded-2xl p-8 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Random Forest
              </h2>
              <p className="text-gray-600">
                Algoritma ensemble dengan banyak pohon keputusan, efektif dan
                stabil dalam memprediksi kemungkinan seseorang positif diabetes.
              </p>

              <div className="mt-6">
                <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:w-40">
                  <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
                    Mulai Prediksi
                  </div>
                  <div className="absolute right-3.5">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
