package com.example.vehicle.crd.repo;

import com.example.vehicle.crd.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepo extends JpaRepository<Vehicle, Integer>
{
}
