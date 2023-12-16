'use client'

import { useState } from 'react'

const stages = [
    { id: 'Stage 1', name: 'Personal Information'},
    { id: 'Stage 2', name: 'Travel Preferences'},
    { id: 'Stage 3', name: 'Health and Safety'},
    { id: 'Stage 4', name: 'Completion'},   
]

export default function Form() {
    const [currentStage, setCurrentStage] = useState(0)

    const next = () => {
        if (currentStage < stages.length - 1) {
            setCurrentStage(stage => stage + 1)
        }
    }
    const prev = () => {
        if (currentStage > 0) {
            setCurrentStage(stage => stage - 1)
        }
    }

    return (
        <section className='absolute inset-0 flex flex-col justify-between p-24'>
            {/* Navigation for the stages */}
            <nav aria-label='Progress'>

            </nav>
            {/* Stage 1 */}

            {/* Stage 2 */}

            {/* Stage 3 */}

            {/* Stage 4 */}

        </section>
    )
}