import React from 'react'

function InfoCard({ label, value, color }) {
    return (
        <div class={`card text-white bg-${color} mb-3 mx-2`} style={{ maxWidth: "18rem" }}>
            <div class="card-header">{label}</div>
            <div class="card-body">
                <h2 class="card-title">{value}</h2>
            </div>
        </div>
    )
}

export default InfoCard