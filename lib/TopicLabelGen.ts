import { ModuleTopic } from "./types";

export const TopicLabelGen = (topics: string[]): ModuleTopic[] => {
    const topicLabel = [];
    for(const topic of topics) {
        topicLabel.push({
            label: topic,
            value: topic
        })
    }
    return topicLabel;
}