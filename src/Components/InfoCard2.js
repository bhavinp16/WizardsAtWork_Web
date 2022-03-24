import React from 'react'

function InfoCard({ label, value, color }) {
    return (
        <div class={`shadow-lg card text-white bg-${color} mb-3 mx-2 `} style={{ maxWidth: "18rem" }}>
            <div class="card-header shadow d-flex align-content-center justify-content-center">{label}</div>
            <div class="card-body">
                <h2 class="card-title d-flex align-content-center justify-content-center" >{value}</h2>
            </div>
        </div>
    )
}

export default InfoCard