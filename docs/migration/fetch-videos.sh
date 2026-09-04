#!/usr/bin/env bash
# Downloads the 17 videos from the old hbotq.com media library (~443 MB total).
# They are NOT committed to this repo because of their size. RUN THIS BEFORE THE DNS CUTOVER
# unless you already have a full server-side backup of wp-content/uploads.
set -euo pipefail
curl -fSL --create-dirs -o "videos/HBOT-Hero-Short.webm" "https://hbotq.com/wp-content/uploads/2024/09/HBOT-Hero-Short.webm"
curl -fSL --create-dirs -o "videos/Boost-Sport-Performance.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Boost-Sport-Performance.mp4"
curl -fSL --create-dirs -o "videos/Brain-Fog.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Brain-Fog.mp4"
curl -fSL --create-dirs -o "videos/Chronic-Pain-and-Hyperbaric-Oxygen-Therapy.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Chronic-Pain-and-Hyperbaric-Oxygen-Therapy.mp4"
curl -fSL --create-dirs -o "videos/Diabetic-Lower-Extremity-Wounds-and-Hyperbaric-Oxygen-Therapy.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Diabetic-Lower-Extremity-Wounds-and-Hyperbaric-Oxygen-Therapy.mp4"
curl -fSL --create-dirs -o "videos/Improve-Your-Healthspan.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Improve-Your-Healthspan.mp4"
curl -fSL --create-dirs -o "videos/Long-Covid-2.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Long-Covid-2.mp4"
curl -fSL --create-dirs -o "videos/Long-Covid.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Long-Covid.mp4"
curl -fSL --create-dirs -o "videos/Long-Haul-Covid-19-and-Hyperbaric-Oxygen-Therapy.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Long-Haul-Covid-19-and-Hyperbaric-Oxygen-Therapy.mp4"
curl -fSL --create-dirs -o "videos/Non-Healing-Wounds-and-Hyperbaric-Oxygen-Therapy.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Non-Healing-Wounds-and-Hyperbaric-Oxygen-Therapy.mp4"
curl -fSL --create-dirs -o "videos/Post-Surgery.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Post-Surgery.mp4"
curl -fSL --create-dirs -o "videos/Radiation-Tissue-Damage-and-Hyperbaric-Oxygen-Therapy.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Radiation-Tissue-Damage-and-Hyperbaric-Oxygen-Therapy.mp4"
curl -fSL --create-dirs -o "videos/Results-for-Long-Term-Injuries.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Results-for-Long-Term-Injuries.mp4"
curl -fSL --create-dirs -o "videos/Skin-Rejuvenation.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Skin-Rejuvenation.mp4"
curl -fSL --create-dirs -o "videos/Stay-at-Your-Best-Longer-Anti-Aging.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Stay-at-Your-Best-Longer-Anti-Aging.mp4"
curl -fSL --create-dirs -o "videos/Sudden-Hearing-Loss-and-Hyperbaric-Oxygen-Therapy.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Sudden-Hearing-Loss-and-Hyperbaric-Oxygen-Therapy.mp4"
curl -fSL --create-dirs -o "videos/Workout-Benefits.mp4" "https://hbotq.com/wp-content/uploads/2024/10/Workout-Benefits.mp4"
echo "Done - 17 videos in ./videos/"
