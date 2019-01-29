FROM python:3.7.2-alpine3.8

COPY requirements.txt /app/

RUN pip install -r /app/requirements.txt

EXPOSE 5000

WORKDIR /app/

CMD ["python", "main.py"]
