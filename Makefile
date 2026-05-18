.PHONY: dev down build k8s-apply k8s-delete

dev:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose build

k8s-apply:
	kubectl apply -k k8s/

k8s-delete:
	kubectl delete -k k8s/
