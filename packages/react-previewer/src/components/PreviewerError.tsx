import React, {useMemo, useState, useContext} from 'react';
import classnames from 'classnames';
import {ProviderContext} from '../context/ProviderContext';
import {
    IPreviewerErrorProps
} from '../types';

export function PreviewerError(props: IPreviewerErrorProps): JSX.Element | null {
    const {
        className,
        renderError
    } = props;
    const context = useContext(ProviderContext);
    const [error, setError] = useState<Error | null>(null);

    useMemo(() => {
        const {
            onErrorCallbacks,
            codeDidCompileCallbacks,
            codeDidRunCallbacks
        } = context;

        const onErrorCallback = (err: Error) => setError(err);
        const codeDidRunCallback = (ret: any, compiledCode: string) => setError(null);
        const codeDidCompileCallback = (code: string, compiledCode: string) => setError(null);

        onErrorCallbacks.push(onErrorCallback);
        codeDidCompileCallbacks.push(codeDidCompileCallback);
        codeDidRunCallbacks.push(codeDidRunCallback);
    }, []);

    if (renderError) {

        return renderError(error);
    }

    if (!error) {
        return null;
    }

    const cls = classnames(className, 'rp-error');

    return (
        <div className={cls}>
            {
                <pre>
                    {error.toString()}
                </pre>
            }
        </div>
    );
}