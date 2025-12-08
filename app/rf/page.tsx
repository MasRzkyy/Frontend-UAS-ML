"use client";

import { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type DiabetesForm = {
  pregnancies: string;
  glucose: string;
  bloodpressure: string;
  skinthickness: string;
  insulin: string;
  bmi: string;
  diabetespedigreefunction: string;
  age: string;
};

type PredictionResult = {
  prediksi: "Positif" | "Negatif";
  performa_model: {
    acc: number | null;
    precision: string;
    recall: string;
    f1_score: string;
  };
};

const FIELD_NAMES = [
  "pregnancies",
  "glucose",
  "bloodpressure",
  "skinthickness",
  "insulin",
  "bmi",
  "diabetespedigreefunction",
  "age",
] as const;

export default function RandomForestDiabetesPage() {
  const [form, setForm] = useState<DiabetesForm>({
    pregnancies: "",
    glucose: "",
    bloodpressure: "",
    skinthickness: "",
    insulin: "",
    bmi: "",
    diabetespedigreefunction: "",
    age: "",
  });

  const [masterInput, setMasterInput] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Isi form dari input master
  const handleParseMasterInput = () => {
    const trimmed = masterInput.trim();
    if (!trimmed) {
      setError("Input cepat tidak boleh kosong.");
      return;
    }

    let values = trimmed.split(",").map((s) => s.trim());
    if (values.length === 1 && !trimmed.includes(",")) {
      values = trimmed.split(/\s+/);
    }

    if (values.length !== FIELD_NAMES.length) {
      setError(
        `Harap masukkan tepat ${FIELD_NAMES.length} nilai (dipisahkan koma atau spasi).`
      );
      return;
    }

    for (const val of values) {
      if (val === "" || isNaN(Number(val))) {
        setError("Semua nilai harus berupa angka.");
        return;
      }
    }

    const newForm: DiabetesForm = {} as DiabetesForm;
    FIELD_NAMES.forEach((key, i) => {
      newForm[key] = values[i];
    });

    setForm(newForm);
    setError(null);
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Hapus spasi di akhir URL!
      const response = await fetch(
        "https://web-production-39361.up.railway.app/api/predict-rf",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pregnancies: form.pregnancies,
            glucose: form.glucose,
            bloodpressure: form.bloodpressure,
            skinThickness: form.skinthickness,
            insulin: form.insulin,
            bmi: form.bmi,
            diabetespedigreefunction: form.diabetespedigreefunction,
            age: form.age,
          }),
        }
      );

      if (!response.ok)
        throw new Error(`Kesalahan jaringan: ${response.status}`);
      const data = await response.json();

      if (data.kode === 200) {
        setResult({
          prediksi: data.prediksi,
          performa_model: data.performa_model,
        });
      } else {
        throw new Error(data.error || "Gagal melakukan prediksi");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      pregnancies: "",
      glucose: "",
      bloodpressure: "",
      skinthickness: "",
      insulin: "",
      bmi: "",
      diabetespedigreefunction: "",
      age: "",
    });
    setMasterInput("");
    setResult(null);
    setError(null);
  };

  const formatLabel = (field: string) => {
    return field
      .replace(/_/g, " ")
      .replace("bloodpressure", "Tekanan Darah")
      .replace("skinthickness", "Ketebalan Kulit")
      .replace("diabetespedigreefunction", "Fungsi Riwayat Diabetes")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="bg-white min-h-screen w-full p-10">
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-md border">
        <h1 className="text-3xl font-bold text-gray-900">
          Prediksi Diabetes dengan Random Forest
        </h1>
        <p className="text-gray-600 mt-2">
          Masukkan data medis pasien untuk memprediksi diabetes menggunakan
          model Random Forest.
        </p>

        {/* === INPUT CEPAT === */}
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <label className="text-sm font-medium text-green-900 block mb-2">
            Input Cepat (pisahkan dengan koma atau spasi)
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <input
              type="text"
              value={masterInput}
              onChange={(e) => setMasterInput(e.target.value)}
              placeholder="Contoh: 2, 120, 70, 30, 150, 28.5, 0.6, 45"
              className="flex-1 border border-green-300 rounded-lg p-3 text-gray-800 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={handleParseMasterInput}
              className="w-full sm:w-auto px-4 py-3 bg-green-600 text-white rounded-lg 
                 hover:bg-green-700 whitespace-nowrap"
            >
              Isi Kolom
            </button>
          </div>

          <p className="text-xs text-green-700 mt-2">
            Urutan: Kehamilan, Glukosa, Tekanan Darah, Ketebalan Kulit, Insulin,
            BMI, Fungsi Riwayat Diabetes, Usia
          </p>
        </div>

        {/* === INPUT INDIVIDU === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {FIELD_NAMES.map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {formatLabel(field)}
              </label>
              <input
                type="number"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="border border-[#cfd8dc] bg-[#f8fbff] p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Masukkan ${field.replace(/_/g, " ")}`}
                step="any"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-10 gap-4">
          <button
            onClick={handleReset}
            className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            onClick={handlePredict}
            disabled={loading}
            className="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            {loading ? "Memproses..." : "Prediksi dengan RF"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 max-w-4xl mx-auto bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {/* === POPUP HASIL PREDIKSI DENGAN DONAT CHART AKURASI === */}
      {result && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && setResult(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative border border-gray-200 animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setResult(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              aria-label="Tutup"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Hasil Prediksi Random Forest
            </h2>

            <div className="flex justify-center mb-6">
              <span
                className={`px-4 py-2 rounded-lg text-white font-semibold ${
                  result.prediksi === "Positif" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {result.prediksi === "Positif"
                  ? "Diabetes: YA"
                  : "Diabetes: TIDAK"}
              </span>
            </div>

            {/* Donat Chart Akurasi */}
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  {(() => {
                    const acc = result.performa_model.acc ?? 0;
                    const correct = parseFloat((acc * 100).toFixed(2));
                    const incorrect = parseFloat(((1 - acc) * 100).toFixed(2));

                    const chartData = [
                      { name: "Benar", value: correct },
                      { name: "Salah", value: incorrect },
                    ];

                    return (
                      <RechartsPieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          labelLine={false}
                          label={({ percent: percent = 0 }) =>
                            `${(percent * 100).toFixed(1)}%`
                          }
                        >
                          <Cell fill="#10B981" /> {/* Hijau untuk Benar */}
                          <Cell fill="#D1FAE5" /> {/* Hijau muda untuk Salah */}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Proporsi"]}
                        />
                      </RechartsPieChart>
                    );
                  })()}
                </ResponsiveContainer>
              </div>

              {/* Teks Akurasi Besar */}
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-700">
                  Akurasi Model
                </p>
                <p className="text-3xl font-bold text-green-700 mt-1">
                  {((result.performa_model.acc ?? 0) * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Metrik Lain (Opsional) */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <p className="text-gray-500">Presisi</p>
                <p className="font-medium">{result.performa_model.precision}</p>
              </div>
              <div>
                <p className="text-gray-500">Recall</p>
                <p className="font-medium">{result.performa_model.recall}</p>
              </div>
              <div>
                <p className="text-gray-500">F1-Score</p>
                <p className="font-medium">{result.performa_model.f1_score}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setResult(null)}
                className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
