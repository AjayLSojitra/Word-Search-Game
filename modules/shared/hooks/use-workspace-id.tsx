import { useSegments, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function (): string {
    const segments = useSegments();
    const params = useGlobalSearchParams();
    const [workspaceId, setWorkspaceId] = useState();

    useEffect(() => {
        setWorkspaceId(getWorkspaceId(segments, params));
    }, [segments, params]);
    return workspaceId;
}

function getWorkspaceId(segments: string[], params: any) {
    if (!segments || segments.length <= 3 || segments[2] != "[workspace]") return undefined;
    return params?.workspace;
}
