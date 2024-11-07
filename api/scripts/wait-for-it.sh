#!/bin/sh
# Use este script para verificar se um host/porta TCP está disponível

WAITFORIT_cmdname=${0##*/}

echoerr() {
    if [ "$WAITFORIT_QUIET" -ne 1 ]; then echo "$@" 1>&2; fi
}

usage() {
    cat << USAGE >&2
Usage:
    $WAITFORIT_cmdname host:port [-s] [-t timeout] [-- command args]
    -h HOST | --host=HOST       Host ou IP para teste
    -p PORT | --port=PORT       Porta TCP para teste
    -s | --strict               Executa o comando apenas se o teste for bem-sucedido
    -q | --quiet                Não exibe mensagens de status
    -t TIMEOUT | --timeout=TIMEOUT
                                Timeout em segundos, zero para sem limite
    -- COMMAND ARGS             Executa o comando com args após o teste
USAGE
    exit 1
}

wait_for() {
    if [ "$WAITFORIT_TIMEOUT" -gt 0 ]; then
        echoerr "$WAITFORIT_cmdname: aguardando $WAITFORIT_TIMEOUT segundos para $WAITFORIT_HOST:$WAITFORIT_PORT"
    else
        echoerr "$WAITFORIT_cmdname: aguardando $WAITFORIT_HOST:$WAITFORIT_PORT sem timeout"
    fi
    WAITFORIT_start_ts=$(date +%s)
    while :
    do
        nc -z "$WAITFORIT_HOST" "$WAITFORIT_PORT" >/dev/null 2>&1
        WAITFORIT_result=$?
        if [ "$WAITFORIT_result" -eq 0 ]; then
            WAITFORIT_end_ts=$(date +%s)
            echoerr "$WAITFORIT_cmdname: $WAITFORIT_HOST:$WAITFORIT_PORT disponível após $((WAITFORIT_end_ts - WAITFORIT_start_ts)) segundos"
            break
        fi
        sleep 1
    done
    return $WAITFORIT_result
}

# Processa argumentos
while [ $# -gt 0 ]
do
    case "$1" in
        *:* )
        WAITFORIT_hostport=$(echo "$1" | sed 's/:/ /')
        WAITFORIT_HOST=$(echo "$WAITFORIT_hostport" | awk '{print $1}')
        WAITFORIT_PORT=$(echo "$WAITFORIT_hostport" | awk '{print $2}')
        shift 1
        ;;
        -q | --quiet)
        WAITFORIT_QUIET=1
        shift 1
        ;;
        -s | --strict)
        WAITFORIT_STRICT=1
        shift 1
        ;;
        -h)
        WAITFORIT_HOST="$2"
        shift 2
        ;;
        --host=*)
        WAITFORIT_HOST="${1#*=}"
        shift 1
        ;;
        -p)
        WAITFORIT_PORT="$2"
        shift 2
        ;;
        --port=*)
        WAITFORIT_PORT="${1#*=}"
        shift 1
        ;;
        -t)
        WAITFORIT_TIMEOUT="$2"
        shift 2
        ;;
        --timeout=*)
        WAITFORIT_TIMEOUT="${1#*=}"
        shift 1
        ;;
        --)
        shift
        WAITFORIT_CLI="$@"
        break
        ;;
        *)
        echoerr "Argumento desconhecido: $1"
        usage
        ;;
    esac
done

# Verificação de argumentos obrigatórios
if [ -z "$WAITFORIT_HOST" ] || [ -z "$WAITFORIT_PORT" ]; then
    echoerr "Erro: você precisa fornecer um host e uma porta para teste."
    usage
fi

WAITFORIT_TIMEOUT=${WAITFORIT_TIMEOUT:-15}
WAITFORIT_STRICT=${WAITFORIT_STRICT:-0}
WAITFORIT_QUIET=${WAITFORIT_QUIET:-0}

# Executa a função de espera
if [ "$WAITFORIT_TIMEOUT" -gt 0 ]; then
    (wait_for) &
    WAITFORIT_PID=$!
    trap "kill -INT -$WAITFORIT_PID" INT
    wait $WAITFORIT_PID
    WAITFORIT_RESULT=$?
else
    wait_for
    WAITFORIT_RESULT=$?
fi

# Execução do comando após a espera
if [ -n "$WAITFORIT_CLI" ]; then
    if [ "$WAITFORIT_RESULT" -ne 0 ] && [ "$WAITFORIT_STRICT" -eq 1 ]; then
        echoerr "$WAITFORIT_cmdname: modo estrito, recusando executar o comando"
        exit $WAITFORIT_RESULT
    fi
    exec $WAITFORIT_CLI
else
    exit $WAITFORIT_RESULT
fi
