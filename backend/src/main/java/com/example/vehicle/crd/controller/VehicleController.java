package com.example.vehicle.crd.controller;
import com.example.vehicle.crd.model.Vehicle;
import com.example.vehicle.crd.repo.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class VehicleController {
    @Autowired
    private VehicleRepo vehicleRepo;

    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getAllVehicles(){
        try{
            List<Vehicle> vehicleList =  new ArrayList<>();
            vehicleRepo.findAll().forEach(vehicleList::add);
            if(vehicleList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(vehicleList, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/vehicles/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Integer id){
        try{
            Optional<Vehicle> vehicleData = vehicleRepo.findById(id);
            if(vehicleData.isPresent()){
                return new ResponseEntity<>(vehicleData.get(),HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/vehicles")
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle){
        try{
            Vehicle vehicleObj = vehicleRepo.save(vehicle);
            return new ResponseEntity<>(vehicleObj, HttpStatus.CREATED);


        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/vehicles/{id}")
    public ResponseEntity<HttpStatus> deleteVehicleById(@PathVariable Integer id){
        try{
            if (!vehicleRepo.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            vehicleRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
